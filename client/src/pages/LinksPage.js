import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { LinksList } from '../components/LinksList';
import { useHttp } from '../hooks/http.hook';

export const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request(
        '/api/link',
        'GET',
        null,
        { Authorization: `Bearer ${token}`}
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
  console.log(links)

  return (
    <>
      { !loading && <LinksList links={ links }/>}
    </>
  );
}