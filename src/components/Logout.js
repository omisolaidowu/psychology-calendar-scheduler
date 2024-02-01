import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import detele_token_db from '../fetch-data/token.delete.db';

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token")
    detele_token_db(access_token)
    sessionStorage.clear();
    history.push("/login")
  }, [history]);

  return null;
};

export default Logout;
