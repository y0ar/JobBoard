import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onAddJob={function (): void {
              throw new Error('Function not implemented.');
          } } onLogin={function (): void {
              throw new Error('Function not implemented.');
          } } onRegister={function (): void {
              throw new Error('Function not implemented.');
          } } />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
