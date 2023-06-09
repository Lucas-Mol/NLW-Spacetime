import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'

import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'

import { styled } from 'nativewind'
import { SplashScreen, Stack } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

// Fonts
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { StatusBar } from 'expo-status-bar'

const StyledStripes = styled(Stripes)

export default function Layout() {
  const [isUSerAuthenticated, setIsUSerAuthenticated] = useState<
    null | boolean
  >(null)

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      setIsUSerAuthenticated(!!token)
    })
  }, [])

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 bg-gray-900 "
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="index" redirect={isUSerAuthenticated} />
        <Stack.Screen name="new" />
        <Stack.Screen name="memories" />
      </Stack>
      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
