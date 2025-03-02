import logo from '/public/logoNoBg2.png'
export default function ApplicationLogo(props) {
    return (
        <img {...props} src={logo} alt='logo'/>
    );
}
