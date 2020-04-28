import React, {Component} from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            foo: 'bar',
            resumeData: {},
            backgroundSource: '',
        };

        ReactGA.initialize('UA-110570651-1');
        ReactGA.pageview(window.location.pathname);

    }

    getResumeData() {
        $.ajax({
            url: '/resumeData.json',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({resumeData: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
                alert(err);
            }
        });
    }

    getBackgroundPicture() {
        let rand = Math.floor(Math.random() * 10);

        // fetch('https://www.reddit.com/r/WidescreenWallpaper/.json')
        fetch('https://www.reddit.com/r/spaceporn/top/.json')
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({backgroundPicture: data.data.children[rand].data.url});
        });
    }

    componentDidMount() {
        this.getResumeData();
        this.getBackgroundPicture();
    }

    render() {
        return (
            <div className="App">
                <Header data={this.state.resumeData.main} backgroundSource={this.state.backgroundPicture}/>
                <About data={this.state.resumeData.main}/>
                <Resume data={this.state.resumeData.resume}/>
                {/*<Portfolio data={this.state.resumeData.portfolio}/>*/}
                {/*<Testimonials data={this.state.resumeData.testimonials}/>*/}
                <Contact data={this.state.resumeData.main}/>
                <Footer data={this.state.resumeData.main}/>
            </div>
        );
    }
}

export default App;
