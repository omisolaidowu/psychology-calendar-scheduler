import SideBar from './../components/SideBar';

const Layout = (Component) => ({ ...props }) =>  {
     return (
          <main className="user-layout-dashboard-container">
               <SideBar />
               <section>
                    <Component {...props} />
               </section>
          </main>
     );
}

export default Layout;
