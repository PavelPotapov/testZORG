import "./swiper"
import "../styles/scss/main.scss"
import initBurger from "./burger"
import { AriaHidden } from "./areaHidden"
import "./popupImages"

initBurger()

const laptopMenu = '[data-id="laptop-menu"]'
new AriaHidden(laptopMenu, 1000)
