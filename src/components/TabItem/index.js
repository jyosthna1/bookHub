import './index.css'

const TabItem = props => {
  const {tabDetails, activeTabCurrent, onClickTab} = props
  const {label, value, id} = tabDetails

  const activeTabClassName = activeTabCurrent
    ? 'tab-button-background-blue'
    : 'tab-button-background'
  const fontColor = activeTabCurrent ? 'font-color-blue' : 'font-color-grey'

  const onClickTabValue = () => {
    onClickTab(value)
  }

  return (
    <li key={value} onClick={onClickTabValue} className="tab-item">
      <button type="button" className={`tab-button ${activeTabClassName}`}>
        {label}
      </button>
    </li>
  )
}

export default TabItem
