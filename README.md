# Introduction

[Nano Toast](https://sonner.emilkowal.ski/) is an opinionated toast component for React. It's customizable, but styled by default.

## Usage

To start using the library, install it in your project:

```bash
npm install nano-toast
```

Add `<Toaster />` to your app, it will be the place where all your toasts will be rendered.
After that you can use `toast()` from anywhere in your app.

```jsx
import { Toaster, toast } from "nano-toast";

// ...

function App() {
  return (
    <div>
      <Toaster />
      <button onClick={() => toast("My first toast")}>Give me a toast</button>
    </div>
  );
}
```

## Types

### Default

Most basic toast. You can customize it (and any other type) by passing an options object as the second argument.

```jsx
toast("Event has been created");
```

With custom icon and description:

```jsx
toast("Event has been created", {
  description: "Monday, January 3rd at 6:00pm",
  icon: <MyIcon />,
});
```

### Success

Renders a checkmark icon in front of the message.

```jsx
toast.success("Event has been created");
```

### Error

Renders an error icon in front of the message.

```jsx
toast.error("Event has not been created");
```

### Promise

Starts in a loading state and will update automatically after the promise resolves or fails.

```ts
const promise = new Promise()<string>((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve("Create event success");
    } else {
      reject("Create event failed");
    }
  }, 4000);
});

const { update } = toast.promise(promise, {
  title: "Creating event...",
  description: "Monday, January 3rd at 6:00pm",
});

promise.then((x) => update({ title: x })).catch((x) => update({ title: x }));
```

### Custom JSX

You can pass jsx as the first argument instead of a string to render custom jsx while maintaining default styling. You can use the headless version below for a custom, unstyled toast.

```jsx
toast(<div>A custom toast with default styling</div>);
```

## Customization

### Headless

You can use `toast.custom` to render an unstyled toast with custom jsx while maintaining the functionality.

```tsx
const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve("Create event success");
    } else {
      reject("Create event failed");
    }
  }, 4000);
});

toast.promise(promise, {
  jsx: ({ value, error, dismiss }) => (
    <div className={styles.headless}>
      <p className={styles.headlessTitle}>
        {value ? value : error ? error : "Creating Event..."}
      </p>
      <p className={styles.headlessDescription}>
        Today at 4:00pm - Louvre Museum
      </p>
      <button className={styles.headlessClose} onClick={dismiss}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2.96967 2.96967C3.26256 2.67678 3.73744 2.67678 4.03033 2.96967L8 6.939L11.9697 2.96967C12.2626 2.67678 12.7374 2.67678 13.0303 2.96967C13.3232 3.26256 13.3232 3.73744 13.0303 4.03033L9.061 8L13.0303 11.9697C13.2966 12.2359 13.3208 12.6526 13.1029 12.9462L13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L8 9.061L4.03033 13.0303C3.73744 13.3232 3.26256 13.3232 2.96967 13.0303C2.67678 12.7374 2.67678 12.2626 2.96967 11.9697L6.939 8L2.96967 4.03033C2.7034 3.76406 2.6792 3.3474 2.89705 3.05379L2.96967 2.96967Z"></path>
        </svg>
      </button>
    </div>
  ),
});
```

### Theme

You can change the theme using the `theme` prop. Default theme is light.

```jsx
<Toaster theme="dark" />
```

### Position

You can change the position through the `position` prop on the `<Toaster />` component. Default is `bottom-right`.

```jsx
// Available positions
// top-left, top-center, top-right, bottom-left, bottom-center, bottom-right

<Toaster position="top-center" />
```

### Expanded

Toasts can also be expanded by default through the `expand` prop. You can also change the amount of visible toasts which is 3 by default.

```jsx
<Toaster expandByDefault visibleToasts={9} />
```

### Rich colors

You can make error and success state more colorful by adding the `richColors` prop.

```jsx
<Toaster richColors />
```

### Custom offset

Offset from the edges of the screen.

```jsx
<Toaster offset="80px" />
```

### Programmatically remove toast

To remove a toast programmatically use `toast.dismiss(id)`.

```jsx
const { dismiss } = toast("Event has been created");

dismiss();
```

### Programmatically remove toast

You can change the duration of each toast by using the `duration` property, or change the duration of all toasts like this:

```jsx
<Toaster duration={10000} />
```

```jsx
toast("Event has been created", {
  duration: 10000,
});
```
