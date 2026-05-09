import { Redirect } from 'expo-router';

/**
 * NOTE:
 * This project has been restructured to use a pre-auth landing screen at `/`
 * and to place the tab navigator under `/(app)/(tabs)`.
 *
 * This legacy route group is kept as a redirect to avoid routing conflicts
 * if the folder wasn't removed.
 */
export default function LegacyTabsLayout() {
  return <Redirect href="/" />;
}
