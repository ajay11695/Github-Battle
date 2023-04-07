import React from 'react'

let tags = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

class Popular extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activebtn: 'All',
            data: null,
            loader: true
        }
    }

    componentDidMount(){
        this.fetch(this.state.activebtn)
    }

    fetch=(language)=>{
      fetch(`https://api.github.com/search/repositories?q=stars:%3E1+language:${language}&sort=stars&order=desc&type=Repositories`)
      .then(res=>res.json())
      .then((data)=>{
        this.setState({
            loader:false,
            data:data.items
        })
      })
    }

    handleClick=(e)=>{
        let id=e.target.id
       this.setState({loader:true,activebtn:tags[e.target.id]})
       this.fetch(tags[id])
    }


    render() {
        let { activebtn, data, loader } = this.state
        return (
            <main>
                <ul className='flex justify-center'>
                    {tags.map((tag, i) =>
                        <span key={tag} className={activebtn === tag ? 'btn activebtn curser' : 'btn curser'} id={i} onClick={this.handleClick}>{tag}</span>
                    )}
                </ul>
                <CardUI data={data} loader={loader} />
            </main>
        )
    }
}

function CardUI(props) {
    let { data, loader } = props
    if (!data) {
        return <div className='textalign font-1 margin-t-1'>Fetching Repositories...</div>
    } else {
        return loader ? <div className='textalign font-1 margin-t-1'>Fetching Repositories...</div> :
            < div className="cards flex evenly wrap">
                {
                    data.map((d, i) => <Card info={d} key={i} index={i} />)
                }
            </div >
    }
}

function Card(props) {
    let { info, index } = props
    return (
        <div key={index} className='card margin-t-1'>
            <div className="flex column align-center">
                <p className='font-2'>#{index + 1}</p>
                <figure className="width-64 margin-t-1">
                    <img src={info.owner.avatar_url} alt="pic" />
                </figure>
                <a href={info.html_url} className='active font-600 font-2 margin-t-1'>{info.owner.login}</a>
            </div>
            <ul className="">
                <li className="margin-t-1 font-1">
                    <i className="fa-solid fa-user"></i>
                    <span className='font-600'>{info.owner.login}</span>
                </li>
                <li className="margin-t-1 font-1">
                    <i className="fa-solid fa-star"></i>
                    <span>{info.stargazers_count} stars</span>
                </li>
                <li className="margin-t-1 font-1">
                    <i className="fa-solid fa-code-fork"></i>
                    <span>{info.forks} forks</span>
                </li>
                <li className="margin-t-1 font-1">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <span>{info.open_issues_count} open issues</span>
                </li>
            </ul>
        </div>
    )
}

export default Popular