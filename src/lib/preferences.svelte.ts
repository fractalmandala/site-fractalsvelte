import { managers, type Manager } from './site';

const MANAGER_KEY = 'fractalsvelte:manager';

/** The reader's package manager, shared by every install block and remembered across visits. */
class Preferences {
	manager = $state<Manager>('pnpm');

	hydrate() {
		try {
			const saved = localStorage.getItem(MANAGER_KEY);
			if (managers.includes(saved as Manager)) this.manager = saved as Manager;
		} catch {
			// storage unavailable — keep the default
		}
	}

	setManager(manager: Manager) {
		this.manager = manager;
		try {
			localStorage.setItem(MANAGER_KEY, manager);
		} catch {
			// storage unavailable — the choice lasts for this page only
		}
	}
}

export const preferences = new Preferences();
