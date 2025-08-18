import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BoardsListScreen from '../screens/BoardsListScreen';
import BoardCanvasScreen from '../screens/BoardCanvasScreen';
import TemplatesListScreen from '../screens/TemplatesListScreen';
import TemplateDetailScreen from '../screens/TemplateDetailScreen';
import AIThreadsScreen from '../screens/AIThreadsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TasksPanelScreen from '../screens/TasksPanelScreen';
import AuthScreen from '../screens/AuthScreen';
import NodeEditorModal from '../components/Modals/NodeEditorModal';
import AIRunResultModal from '../components/Modals/AIRunResultModal';
import PurchaseModal from '../components/Modals/PurchaseModal';
import { useStore } from '../state/store';
import { useTheme } from '../theme/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BoardsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BoardsList" component={BoardsListScreen} options={{ title: 'Boards' }} />
      <Stack.Screen name="BoardCanvas" component={BoardCanvasScreen} options={{ title: 'Canvas' }} />
      <Stack.Screen name="TasksPanel" component={TasksPanelScreen} options={{ presentation: 'modal', title: 'Tasks' }} />
    </Stack.Navigator>
  );
}

function TemplatesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TemplatesList" component={TemplatesListScreen} options={{ title: 'Templates' }} />
      <Stack.Screen name="TemplateDetail" component={TemplateDetailScreen} options={{ title: 'Template' }} />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const { user } = useStore((s) => ({ user: s.user }));
  const t = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RootTabs" component={Tabs} />
        <Stack.Screen name="Auth" component={AuthScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="NodeEditorModal" component={NodeEditorModal} options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="AIRunResultModal" component={AIRunResultModal} options={{ presentation: 'modal', title: 'AI Result' }} />
        <Stack.Screen name="PurchaseModal" component={PurchaseModal} options={{ presentation: 'modal', title: 'Purchase' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  function Tabs() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: t.color.primary }}>
        <Tab.Screen name="BoardsTab" component={BoardsStack} options={{ title: 'Boards' }} />
        <Tab.Screen name="TemplatesTab" component={TemplatesStack} options={{ title: 'Templates' }} />
        <Tab.Screen name="AITab" component={AIThreadsScreen} options={{ title: 'AI' }} />
        <Tab.Screen name="ProfileTab" component={user ? ProfileScreen : AuthScreen} options={{ title: 'Profile' }} />
      </Tab.Navigator>
    );
  }
}
