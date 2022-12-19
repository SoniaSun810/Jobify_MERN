import { useAppContext } from "../context/appContext";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import Wrapper from "../assets/wrappers/BigSidebar";

const BigSidebar = () => {
  const { showSideBar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSideBar ? 'sidebar-container show-sidebar': 'sidebar-container'
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
        </div>
        <NavLinks />
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
