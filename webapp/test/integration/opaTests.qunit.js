/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["myapp/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
