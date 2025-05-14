import { App } from "obsidian";
import { ViewDashboard } from "./view/Dashboard";

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
                                console.log("Dashboard closed");
                                resolve(GamifyControllerState.CLOSE);
                            }
                        });
                    });
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
    CLOSE
}