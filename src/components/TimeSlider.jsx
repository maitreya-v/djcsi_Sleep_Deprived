import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from '@chakra-ui/react'
import { useState } from 'react';
// import { Tooltip } from 'react-leaflet';

const TimeSlider = () => {
  const [sliderValue, setSliderValue] = useState(0)
  const [showTooltip, setShowTooltip] = useState(false)
  return (
    <Slider
      id='slider'
      defaultValue={0}
      min={0}
      max={240}
      onChange={(v) => setSliderValue(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderMark value={0} mt='1' ml='-2.5' fontSize='sm'>
        0 min
      </SliderMark>
      <SliderMark value={240} mt='1' ml='-2.5' fontSize='sm'>
        4 hr
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg='#afa9fc'
        color='#a4a9fc'
        placement='top'
        isOpen={showTooltip}
        label={`${sliderValue} min`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  )
}

export default TimeSlider;