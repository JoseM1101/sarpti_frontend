import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { Settings } from "react-slick"
import { HTMLAttributes } from "react"

interface SliderProps {
  settings?: Settings
  children: React.ReactNode
}

interface StepProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CustomSlider = ({ settings, children }: SliderProps) => {
  const defaultSettings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const mergedSettings = { ...defaultSettings, ...settings }

  return <Slider {...mergedSettings}>{children}</Slider>
}

CustomSlider.Step = ({ children, ...props }: StepProps) => {
  return (
    <div
      {...props}
      className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-lightblue border border-lightblue"
    >
      {children}
    </div>
  )
}

export default CustomSlider
