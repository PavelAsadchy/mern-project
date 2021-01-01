import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);
  const linkId = useParams().id; // Name "id" comes from route path /detail/:id

  const getLink = useCallback(async() => {
    try {
      const fetched = await request(
        `/api/link/${linkId}`,
        'GET',
        null,
        { Authorization: `Bearer ${token}`}
      );
      setLink(fetched);
    } catch (err) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      { !loading && link && <LinkCard />}
    </>
  );
}