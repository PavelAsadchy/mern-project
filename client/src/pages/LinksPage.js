import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { useHttp } from '../hooks/http.hook';

export const LinksPage = () => {
  const [links, setLinks] = useState();
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = request(
        '/api/link',
        'GET',
        null,
        { Authorized: `Bearer ${token}`}
      );
      setLinks(fetched);
    } catch (err) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks])

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      { !loading && <LinksList links={ links }/>}
    </>
  );
}