import React from 'react';
import scss from "./AlertMessages.module.scss";
interface IAlertMessageProps{
	error:any
	hideAlert: () => void;
}
export class AlertMessage extends  React.PureComponent<IAlertMessageProps>{
	public timeoutID:any = null;
	public constructor(props:any) {
		super(props);
	}

	public componentWillUnmount(): void {
		clearTimeout(this.timeoutID)
	}

	public componentDidMount(): void {
		this.timeoutID = setTimeout(()=>{
			this.props.hideAlert();
		}, 3000)
	}

	public render(){
		let message = "Sorry Something went wrong";
		const className = "alert-danger";
		if(this.props.error.status === 404){
			message = "Sorry No records found for applied filter combination(s)";
		}
		return(
				<div className={scss.alertMessage}>
					<div className={`alert ${className}`}>
						{message}
					</div>
				</div>
		);
	}

}
