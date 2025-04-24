# Ensured Navigation

`Ensured Navigation` is a component that guarantees page transitions in Next.js by addressing asynchronous rendering timing issues. If a page transition fails due to an async operation, it retries navigation for a set period to ensure a reliable redirect.

## 🚀 Features

- **Guaranteed Navigation**: Resolves timing issues caused by asynchronous operations to ensure reliable page transitions.
- **Custom Behavior**: Allows you to define custom actions to be triggered on successful navigation (`onSuccess`) or when navigation fails (`onFail`).
- **Supports push and replace**: You can choose the navigation method between `push` and `replace`.
- **Timing Configuration**: You can set the maximum retry time for navigation, preventing infinite loops.

## 🧰 Install

```bash
npm install ensured-navigation
```

## ⚙️ Usage

1. Import the `EnsuredNavigation` component.

   ```tsx
   import EnsuredNavigation from 'ensured-navigation';
   ```

2. Use the `EnsuredNavigation` component in the place where page navigation is required, passing url and options as props.
   - This example is designed to handle cases where `router.push` or `router.replace` may not function as expected during file uploads. By using the `EnsuredNavigation` component, page transitions are guaranteed. If navigation fails due to timing issues during asynchronous tasks, it retries the navigation for a specified period to ensure a reliable redirect.
   ```tsx
   import { useState } from 'react';   
   import EnsuredNavigation from 'ensured-navigation'; // Import EnsuredNavigation component
   
   const ExampleComponent = () => {
       const [url, setUrl] = useState('');
       const [loading, setLoading] = useState(false);
   
       const handleSuccess = () => {
           console.log("Page navigation success!"); // Callback function for when page navigation is successful
       };
   
       const handleFail = () => {
           console.log("Page navigation failure!"); // Callback function for when page navigation fails
       };
   
       const handleUpload = async () => {
           setLoading(true); // Set loading to true when starting the upload process
           try {
               const response = await fetch('/upload-endpoint', {
                   method: 'POST',
                   body: new FormData(document.getElementById('upload-form') as HTMLFormElement), // Sending the form data
               });

               if (response.ok) {
                   setUrl('/some-url'); // Update the URL for navigation after successful upload
               } else {
                   console.error("Upload failed"); // Log an error if the upload fails
               }
           } catch (error) {
               console.error("Upload error:", error); // Catch any errors during the upload process
           } finally {
               setLoading(false); // Set loading to false once the upload is complete (whether successful or not)
           }
       };
    
       return (
            <>
            <form id="upload-form" onSubmit={(e) => e.preventDefault()}>
            <input type="file" name="file" />
            <button type="button" onClick={handleUpload} disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'} {/* Display 'Uploading...' during the upload process */}
            </button>
            </form>

            <EnsuredNavigation
              url={url} // Pass the URL for navigation to EnsuredNavigation
              options={{
                onSuccess: handleSuccess,  // Callback function to be executed when page navigation is successful
                onFail: handleFail,        // Callback function to be executed when page navigation fails
                method: 'push',            // Navigation method ('push' or 'replace')
                maxDurationMs: 5000,       // Maximum retry time (default: 5000ms)
              }} 
            />
          </>
       );
   };

   export default ExampleComponent;
   
   ```

3. Explanation of the props for the `EnsuredNavigation` component:

   | Prop                  | Type                | Description                                                 |
      |-----------------------|---------------------|-------------------------------------------------------------|
   | url                   | string              | The URL path to navigate to.                                |
   | options               | object              | (Optional) Configuration object.                            |
   | options.onSuccess     | () => void          | Callback function executed when the navigation succeeds.    |
   | options.onFail        | () => void          | Callback function executed when the navigation fails.       |
   | options.method        | 'push' or 'replace' | Navigation method ('push' or 'replace', default is 'push'). |
   | options.maxDurationMs | number              | Maximum retry time for navigation (default is 5000ms).      |


## 📦 License

`EnsuredNavigation` is licensed under the [MIT License](https://opensource.org/licenses/MIT)