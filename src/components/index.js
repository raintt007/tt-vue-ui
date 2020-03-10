import Container from "../components/container/index";
import Aside from "../components/aside/index";
import Header from "../components/header/index";
import Main from "../components/main/index";
import Footer from "../components/footer/index";
import Typography from "../components/typography/index";
import Cropper from "../components/cropper/index";
import Button from "../components/button/index";
import Card from "../components/card/index";
import Row from "../components/row/index";
import Col from "../components/col/index";
const components = [
  Container,
  Aside,
  Header,
  Main,
  Footer,
  Typography,
  Cropper,
  Button,
  Card,
  Row,
  Col
]
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}
export default {
  install,
  ...components
}