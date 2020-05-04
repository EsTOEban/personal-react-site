import React, {Component} from 'react';
import ReactGA from 'react-ga';
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
        fetch(process.env.PUBLIC_URL + '/resumeData.json').then(results => {
            return results.json();
        }).then(data => {
            this.setState({resumeData: data});
        });
    }

    setBackgroundPicture() {
        this.setState({backgroundPicture: process.env.PUBLIC_URL + '/images/background.jpg'});
    }

    componentDidMount() {
        this.getResumeData();
        this.setBackgroundPicture();
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
