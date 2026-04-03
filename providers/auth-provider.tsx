import { AuthContext } from '@/hooks/use-auth-context';
import { supabase } from '@/utils/supabase';
import * as Notifications from 'expo-notifications';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function AuthProvider({ children }: PropsWithChildren) {
  const [claims, setClaims] = useState<Record<string, any> | undefined | null>()
  const [profile, setProfile] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchClaims = async () => {
      setIsLoading(true)

      const { data, error } = await supabase.auth.getClaims()

      if (error) {
        console.error('Error fetching claims:', error)
      }

      setClaims(data?.claims ?? null)
      setIsLoading(false)
    }

    fetchClaims()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, _session) => {
    if (_session) {
        setClaims(_session.user)
    } else {
        setClaims(null)
    }
})

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!claims) return;

    const registerPushToken = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') return;
        
        const token = await Notifications.getExpoPushTokenAsync({ 
            projectId: '9bd48df6-2aee-4ca0-a00a-9135d571ed8c' 
        });

        const { error } = await supabase
            .from('profiles')
            .upsert({ 
                id: claims.sub ?? claims.id,
                push_token: token.data 
            });

        if (error) console.error('Push token error:', error);
    };

    registerPushToken();
}, [claims]);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)

      if (claims) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', claims.sub ?? claims.id)
          .single()

        setProfile(data)
      } else {
        setProfile(null)
      }

      setIsLoading(false)
    }

    fetchProfile()
  }, [claims])

  return (
    <AuthContext.Provider
      value={{
        claims,
        isLoading,
        profile,
        isLoggedIn: claims != null,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}