import { LayersProps } from '../../models/CharacterModels'

const IconLayer = ({ layer, size }: { layer: LayersProps, size?: string }) => {
  const imgClassName = `w-3 h-3 ${size || ''}`

  switch (layer?.name) {
    case 'ExtraSup':
      return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1"
        xmlns="http://www.w3.org/2000/svg" className={imgClassName}>
        <polygon points="4,10 12,6 20,10 12,14" fill="none" className="stroke-gray-100" />
        <polygon points="4,12 12,8 20,12 12,16" fill="none" className="stroke-gray-100" />
        <polygon points="4,8 12,4 20,8 12,12" className="stroke-gray-100 fill-accent" />
      </svg>
    case 'Head':
      return <img src="/img/icons-layers/head.svg" alt="head-icon" className={imgClassName} />
    case 'Body':
      return <img src="/img/icons-layers/body.svg" alt="body-icon" className={imgClassName} />
    case 'ArmLeft':
      return <img src="/img/icons-layers/leftArm.svg" alt="leftArm-icon" className={imgClassName} />
    case 'ArmRight':
      return <img src="/img/icons-layers/rightArm.svg" alt="rightArm-icon" className={imgClassName} />
    case 'Background':
      return <img src="/img/icons-layers/background.svg" alt="background-icon" className={imgClassName} />
    case 'ExtraBottom':
      return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1" xmlns="http://www.w3.org/2000/svg" className={imgClassName}>
        <polygon points="4,12 12,8 20,12 12,16" className='stroke-gray-100 fill-accent' />
        <polygon points="4,8 12,4 20,8 12,12" fill="none" className='stroke-gray-100' />
        <polygon points="4,10 12,6 20,10 12,14" fill="none" className='stroke-gray-100' />
      </svg>
    default:
      return null
  }
}

export default IconLayer
