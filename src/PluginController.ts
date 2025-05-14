import { App } from "obsidian";
import { ViewDashboard } from "./view/Dashboard";
import { ViewConfiguration } from "./view/Configuration";
import Gamify from "main";

export class GamifyController {

    static async openUi() {
        let state = GamifyControllerState.DASHBOARD;
        do {
            switch (state) {
                case GamifyControllerState.DASHBOARD: {
                    state = await new Promise<GamifyControllerState>((resolve) => {
                        const modal = new ViewDashboard({
                            onClickConfigure: () => {
                                resolve(GamifyControllerState.CONFIGURE);
                            },
                            onQuit: () => {
                                resolve(GamifyControllerState.CLOSE);
                            }
                        });
                    });
                    break;
                }

                case GamifyControllerState.CONFIGURE: {
                    state = await new Promise<GamifyControllerState>((resolve) => {
                        const modal = new ViewConfiguration({
                            onQuit: () => {
                                resolve(GamifyControllerState.CLOSE);
                            },
                            onApply: () => {
                                Gamify.DATA.save();
                                resolve(GamifyControllerState.DASHBOARD);
                            },
                            onClickManageRewards: () => {
                                resolve(GamifyControllerState.CONFIGURE_REWARDS);
                            }
                        });
                    });
                    break;
                }

                case GamifyControllerState.CONFIGURE_REWARDS: {
                    break;
                }

                default: {
                    console.error(`Unknown state: ${state}`);
                    state = GamifyControllerState.CLOSE;
                    break;
                }
            } 
        } while (state != GamifyControllerState.CLOSE);
    }
}

enum GamifyControllerState {
    DASHBOARD,
    CONFIGURE,
    CONFIGURE_REWARDS,
    CLOSE
}