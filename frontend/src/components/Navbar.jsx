import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">Task Manager</div>

      <div className="nav-right">
        <a href="/register" className="signin-btn">Sign In</a>
      </div>
    </nav>
  );
}
