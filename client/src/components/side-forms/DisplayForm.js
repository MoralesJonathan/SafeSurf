import React from "react";
import InputRange from 'react-input-range';
import Toggle from "react-toggle-component"
import { Container } from "react-bootstrap";
import "react-toggle-component/styles.css"
import 'react-input-range/lib/css/index.css';

function DisplayForm(props) {
    const displayProps = props.display;
    return (
        <React.Fragment>
            <Container style={{ paddingTop: "20px" }}>
                <h1>Display</h1>
                <div style={{filter:`blur(${props.display.blurLevel * 10}px)`, opacity: displayProps.blankContent ? 0 : 1, display: displayProps.showContent ? 'block' : 'none'}}>
                    <img style={{width: '100%'}} src="https://media-assets-04.thedrum.com/cache/images/thedrum-prod/s3-news-tmp-108565-screen_shot_2018-01-03_at_3.22.11_pm--2x1--940.png" />
                    <p style={{textAlign:'center'}}>Karl Marx was a great man!</p>
                </div>
                <div className="form-group">
                    <label>Blurriness level</label>
                    <InputRange
                        name="blurLevel"
                        maxValue={5}
                        minValue={0}
                        value={displayProps.blurLevel}
                        onChange={(val) => props.changeDisplaySettings({value: val, name: 'blurLevel'})}
                    />
                </div>
                <div style={{padding: '24px 0'}}>
                    <Toggle
                        name="blankContent" 
                        labelRight="Blank Images?" 
                        checked={displayProps.blankContent}
                        onToggle={(val) => props.changeDisplaySettings({value: val, name: 'blankContent'})}
                    />
                </div>
                <div>
                    <Toggle
                        name="showContent" 
                        labelRight="Show Images?" 
                        checked={displayProps.showContent}
                        onToggle={(val) => props.changeDisplaySettings({value: val, name: 'showContent'})}
                    />
                </div>
            </Container>
        </React.Fragment>
    )
}

export default DisplayForm;
