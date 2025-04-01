import { signInWithGoogle } from '../firebase/firebase';

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={signInWithGoogle}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;