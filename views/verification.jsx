import React from 'react';
import ApplicationLayout from './layout/application';



class VerificationPage extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        return(
            <ApplicationLayout data={this.props}>
                <div className="text-center">
                    <h1 className="text-center">Two Factor Verification</h1>
                    <a href="/logout" className="btn btn-default btn-sm">Logout</a><br />
                    <hr />
                    <div id="2fa-verification-area">

                    </div>
                </div>
            </ApplicationLayout>
        )
    }
}

module.exports = VerificationPage;