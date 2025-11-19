import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} VeggieMart. All rights reserved.</p>
        </footer>
    );
};
export default Footer;