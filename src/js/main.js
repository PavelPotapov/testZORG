import "../styles/scss/main.scss"
import "./swiper"
import initBurger from "./burger"
import { AriaHidden } from "./areaHidden"

initBurger()

const laptopMenu = '[data-id="laptop-menu"]'
new AriaHidden(laptopMenu, 1000)
