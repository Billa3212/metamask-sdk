import { ChainablePromiseElement } from 'webdriverio';
import Gestures from '../../Gestures';
import {
  AndroidSelectorStrategies,
  IOSSelectorStrategies,
} from '../../Strategies';
import Utils from '../../Utils';

class OptinMetricsScreen {
  get acceptOptinMetrics(): ChainablePromiseElement<WebdriverIO.Element> {
    return $(
      Utils.getLocatorPerPlatformAndStrategy({
        androidLocator: {
          locator: 'optin-metrics-i-agree-button-id',
          strategy: AndroidSelectorStrategies.AccessibilityID,
        },
        iosLocator: {
          locator: 'label == "I agree"',
          strategy: IOSSelectorStrategies.IOSPredicateString,
        },
      }),
    );
  }

  async tapAgreeOptinMetrics(): Promise<void> {
    if (!(await this.isAcceptOptinMetricsEnabled())) {
      await Gestures.swipeByPercentage({ x: 50, y: 50 }, { x: 50, y: 5 });
    }
    await (await this.acceptOptinMetrics).click();
  }

  async isAcceptOptinMetricsEnabled(): Promise<boolean> {
    return (await this.acceptOptinMetrics).isEnabled();
  }
}

export default new OptinMetricsScreen();
