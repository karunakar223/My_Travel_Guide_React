import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const AppItem = props => {
  const {appDetails} = props
  const {name, imageUrl, description} = appDetails
  return (
    <li className="li-container">
      <div className="card-container">
        <img src={imageUrl} alt={name} className="image" />
        <h1 className="name">{name}</h1>
        <p className="description">{description}</p>
      </div>
    </li>
  )
}

class TravelGuide extends Component {
  state = {
    appData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getGuideDetails()
  }

  getGuideDetails = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const res = await fetch(url, options)
    if (res.ok === true) {
      const resData = await res.json()
      console.log(resData)
      const fetchedData = resData.packages.map(eachPackage => ({
        id: eachPackage.id,
        name: eachPackage.name,
        description: eachPackage.description,
        imageUrl: eachPackage.image_url,
      }))

      this.setState({appData: fetchedData, isLoading: false})
    }
  }

  render() {
    const {appData, isLoading} = this.state
    return (
      <div className="guide-container">
        <h1 className="main-heading">Travel Guide</h1>
        {console.log(appData)}
        <ul className="ul-container">
          {isLoading ? (
            <div className="loader" data-testid="loader">
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            </div>
          ) : (
            appData.map(eachData => (
              <AppItem key={eachData.id} appDetails={eachData} />
            ))
          )}
        </ul>
      </div>
    )
  }
}

export default TravelGuide
