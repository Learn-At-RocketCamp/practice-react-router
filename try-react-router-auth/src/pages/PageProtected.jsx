import { useAuth } from '../components/useAuth';

// const PageProtected = () => {
function PageProtected() {
  const { token } = useAuth();

  return (
    <main className="container mx-auto p-2">
      <h2 className="bg-orange-300">! This is PageProtected !</h2>
      <p className="text-xl text-yellow-600">TODOLIST</p>

      <pre>{JSON.stringify(token, null, 2)}</pre>
    </main>
  );
}

export default PageProtected;
