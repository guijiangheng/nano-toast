import copy from "copy-to-clipboard";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Highlight, { defaultProps } from "prism-react-renderer";
import { useCallback, useState } from "react";

import styles from "./code-block.module.css";

const variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.5 },
};

const theme = {
  plain: {
    color: "var(--gray12)",
    fontSize: 12,
    fontFamily: "var(--font-mono)",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "var(--gray9)",
      },
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "var(--gray10)",
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "var(--gray9)",
      },
    },
    {
      types: ["class-name", "function", "tag"],
      style: {
        color: "var(--gray12)",
      },
    },
  ],
};

export const CodeBlock = ({ children }: { children: string }) => {
  const [copying, setCopying] = useState(false);

  const onCopy = useCallback(() => {
    copy(children);
    setCopying(true);
    setTimeout(() => {
      setCopying(false);
    }, 2000);
  }, [children]);

  return (
    <div className={styles.container}>
      <button className={styles.copyBtn} onClick={onCopy}>
        <MotionConfig transition={{ duration: 0.15 }}>
          <AnimatePresence initial={false} mode="wait">
            {copying ? (
              <motion.div
                animate="visible"
                exit="hidden"
                initial="hidden"
                key="check"
                variants={variants}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  shapeRendering="geometricPrecision"
                >
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </motion.div>
            ) : (
              <motion.div
                animate="visible"
                exit="hidden"
                initial="hidden"
                key="copy"
                variants={variants}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  shapeRendering="geometricPrecision"
                >
                  <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"></path>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </MotionConfig>
      </button>

      <Highlight {...defaultProps} theme={theme} code={children} language="jsx">
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} ${styles.pre}`}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })} key={i}>
                {line.map((token, key) => (
                  <span
                    {...getTokenProps({
                      token,
                      key,
                    })}
                    key={key}
                  />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};
