// import React from 'react';
// import { View } from 'react-native';
// import TodoApp from './src/components/TodoApp';
// import Register from './src/components/Register';
// import LogIn from './src/components/LogIn';
// import VarifyEmail from './src/components/VarifyEmail';

// export default function App() {

//   return (
//     <View>
//       {/* < TodoApp/> */}
//       {/* < Register /> */}
//       {/* < LogIn /> */}
//       < VarifyEmail />
//     </View>
//   );
// }

import React from 'react';
import { StyleSheet, View, Platform,SafeAreaView } from 'react-native';
import { UserContextProvider, useUser } from './src/components/UserContext';
import TodoApp from './src/components/TodoApp';
import Auth from './src/components/Auth';


const Container = () => {
  const { user } = useUser()

  return user ? <TodoApp user={user}/> : <Auth />
}

export default function App() {
  return (
    <UserContextProvider>
        <Container />
      {/* <View>
      </View> */}
    </UserContextProvider>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 100,
//     padding: 10,
//   },
// })
