import createHistory from "history/createMemoryHistory";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";

import i18n from "common/i18n";
import configureStore from "store/configureStore";
import { getCurrentLayer } from "layer";
import Router from "router";
import "styles/global.scss";

const history = createHistory();
const store = configureStore(history);
const layer = getCurrentLayer();

const renderRoot = (mountElement: HTMLElement) => {
	render(
		<I18nextProvider i18n={i18n}>
			<Provider store={store}>
				<Router history={history} />
			</Provider>
		</I18nextProvider>,
		mountElement
	);
};

const insertMountElement = (target: Element) => {
	const element = document.createElement("div");
	element.id = "tube-mount";
	target.insertBefore(element, target.firstChild);

	return element;
};

const observer = new MutationObserver(() => {
	if (document.querySelector(layer.getWatchQuery())) {
		observer.disconnect();

		const mount = insertMountElement(document.querySelector(layer.getMountElementQuery())!);
		renderRoot(mount);
	}
});

observer.observe(document.body, { childList: true, subtree: true });