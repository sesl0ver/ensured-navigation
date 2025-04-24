# Ensured Navigation

`Ensured Navigation`은 Next.js에서 페이지 이동 중 발생할 수 있는 비동기 렌더링 타이밍 문제를 해결하여, 페이지 이동을 보장하는 컴포넌트입니다. 비동기 작업으로 인해 페이지 이동이 실패할 경우, 일정 시간 동안 재시도하여 안정적인 이동을 구현할 수 있도록 돕습니다.

## 🚀 기능

- **페이지 이동 보장**: 비동기 작업에 의한 타이밍 문제를 해결하고, 페이지 이동을 확실히 처리합니다.
- **사용자 정의 동작**: 페이지 이동 성공 시 (`onSuccess`), 실패 시 (`onFail`) 커스텀 동작을 정의할 수 있습니다.
- **`push`와 `replace` 지원**: 페이지 이동 방식으로 `push`와 `replace`를 선택할 수 있습니다.
- **타이밍 설정**: 페이지 이동 시 재시도 최대 시간을 설정할 수 있어 무한 루프를 방지합니다.

## 🧰 설치

```bash
npm install ensured-navigation
```

## ⚙️ 사용법

1. `EnsuredNavigation` 컴포넌트를 import 합니다.

   ```tsx
   import EnsuredNavigation from 'ensured-navigation';
   ```

2. `EnsuredNavigation` 컴포넌트를 페이지 이동이 필요한 곳에 사용합니다. url과 options를 props로 전달합니다.
   - 이 예제는 파일 업로드 시 `router.push` 또는 `router.replace`가 정상적으로 동작하지 않는 경우에 대비한 것입니다. `EnsuredNavigation` 컴포넌트를 사용하여 페이지 이동을 보장합니다. 비동기 작업 중에 발생할 수 있는 타이밍 문제로 인해 페이지 이동이 실패할 경우, 일정 시간 동안 재시도하여 안정적인 이동을 보장합니다.

   ```tsx
   import { useState } from 'react';
   import EnsuredNavigation from 'ensured-navigation'; // EnsuredNavigation 컴포넌트 임포트
   
   const ExampleComponent = () => {
       const [url, setUrl] = useState('');
       const [loading, setLoading] = useState(false);
   
       const handleSuccess = () => {
           console.log("페이지 이동 성공!"); // 페이지 이동이 성공했을 때 실행되는 콜백 함수
       };
       
       const handleFail = () => {
           console.log("페이지 이동 실패!"); // 페이지 이동이 실패했을 때 실행되는 콜백 함수
       };
   
       const handleUpload = async () => {
           setLoading(true); // 업로드 프로세스를 시작할 때 로딩 상태를 true로 설정
           try {
               const response = await fetch('/upload-endpoint', {
                   method: 'POST',
                   body: new FormData(document.getElementById('upload-form') as HTMLFormElement), // 폼 데이터를 전송
               });
       
               if (response.ok) {
                   setUrl('/some-url'); // 업로드가 성공하면 페이지 이동을 위한 URL을 업데이트
               } else {
                   console.error("업로드 실패"); // 업로드 실패 시 에러 로그 출력
               }
           } catch (error) {
               console.error("업로드 중 에러 발생:", error); // 업로드 중 발생한 에러를 캐치하고 로그 출력
           } finally {
               setLoading(false); // 업로드가 완료된 후 (성공 여부에 관계없이) 로딩 상태를 false로 설정
           }
       };
   
       return (
           <>
           <form id="upload-form" onSubmit={(e) => e.preventDefault()}>
               <input type="file" name="file" />
               <button type="button" onClick={handleUpload} disabled={loading}>
               {loading ? '업로드 중...' : '업로드'} {/* 업로드 중일 때는 '업로드 중...' 표시 */}
               </button>
           </form>
               
           <EnsuredNavigation
               url={url} // EnsuredNavigation에 페이지 이동을 위한 URL 전달
               options={{
                   onSuccess: handleSuccess,  // 페이지 이동 성공 시 실행될 함수
                   onFail: handleFail,        // 페이지 이동 실패 시 실행될 함수
                   method: 'push',            // 페이지 이동 방식 ('push' 또는 'replace')
                   maxDurationMs: 5000,       // 최대 재시도 시간 (기본값: 5000ms)
               }} />
           </>
       );
   };
   
   export default ExampleComponent;
   ```

3. `EnsuredNavigation` 컴포넌트의 props 설명:

   | Prop                  | Type                | Description                    |
      |-----------------------|---------------------|--------------------------------|
   | url                   | string              | 이동할 URL 경로                     |
   | options               | object              | (선택 사항) 옵션 객체                  |
   | options.onSuccess     | () => void          | 페이지 이동이 성공했을 때 실행할 콜백 함수       |
   | options.onFail        | () => void          | 페이지 이동이 실패했을 때 실행할 콜백 함수       |
   | options.method        | 'push' or 'replace' | 페이지 이동 방식 (기본값: 'push')        |
   | options.maxDurationMs | number              | 페이지 이동 재시도 최대 시간 (기본값: 5000ms) |

## 📦 라이선스

`EnsuredNavigation`는 [MIT 라이선스](https://opensource.org/licenses/MIT)를 따릅니다.