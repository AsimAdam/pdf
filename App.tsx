import React, { Component } from 'react';
import {
	AppRegistry,
	Button,
	Dimensions,
	Platform,
	StyleSheet,
	View,
} from 'react-native';
import PSPDFKitView from 'react-native-pspdfkit';
import Pdf from 'react-native-pdf';

interface Props {}

const DOCUMENT =
	Platform.OS === 'ios'
		? 'Document.pdf'
		: 'file:///android_asset/Document.pdf';
const source =
	Platform.OS === 'ios'
		? require('./ios/Document.pdf')
		: { uri: 'bundle-assets://Document.pdf' };

class ReactNativePDFViewer extends Component<Props> {
	state = {
		pdfViewer: null,
	};

	render() {
		let renderView: JSX.Element | null = null;

		if (this.state.pdfViewer == null) {
			renderView = (
				<View style={styles.container} ref="Welcome">
					<Button
						onPress={async () => {
							this.setState({
								pdfViewer: 'react-native-pdf',
							});
						}}
						title="Open a PDF with react-native-pdf"
					/>
					<Button
						onPress={async () => {
							this.setState({
								pdfViewer: 'PSPDFKit',
							});
						}}
						title="Open a PDF with PSPDFKit"
					/>
				</View>
			);
		} else if (this.state.pdfViewer == 'PSPDFKit') {
			renderView = (
				<PSPDFKitView
					ref="PSPDFKit"
					// Set the document.
					document={DOCUMENT}
					// Show the back button on Android.
					showNavigationButtonInToolbar={true}
					// Show the back button on iOS.
					showCloseButton={true}
					// The configuration is optional.
					configuration={{
						showThumbnailBar: 'scrollable',
					}}
					// Set the document to `null` on Android.
					onNavigationButtonClicked={() => {
						this.setState({ pdfViewer: null });
					}}
					// Set the document to `null` on iOS.
					onCloseButtonPressed={() => {
						this.setState({ pdfViewer: null });
					}}
					style={styles.pdf}
				/>
			);
		} else if (this.state.pdfViewer == 'react-native-pdf') {
			renderView = (
				<View style={{ flex: 1 }}>
					<Pdf
						ref="react-native-pdf"
						source={source}
						enablePaging={true}
						horizontal={true}
						style={styles.pdf}
					/>
					<View style={styles.closeButton}>
						<View>
							<Button
								onPress={() => {
									this.setState({ pdfViewer: null });
								}}
								title="Close"
							/>
						</View>
					</View>
				</View>
			);
		}

		return <View style={{ flex: 1 }}>{renderView}</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	pdf: {
		flex: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	closeButton: {
		position: 'absolute',
		left: 10,
		top: 30,
		flexDirection: 'row',
		height: 60,
		alignItems: 'center',
		padding: 10,
	},
});

AppRegistry.registerComponent(
	'ReactNativePDFViewer',
	() => ReactNativePDFViewer,
);