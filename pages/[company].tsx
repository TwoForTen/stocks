import { useEffect, useState, useContext } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { throttle } from 'lodash';

import { SocketContext } from '../src/context/Socket';

const CompanyPage: NextPage = () => {
  const router = useRouter();
  const { company } = router.query;
  const { socket } = useContext(SocketContext);

  const [wsData, setWsData] = useState<any>();

  console.log(wsData);

  useEffect(() => {
    socket.on(
      'data',
      throttle((data: any) => setWsData(data), 10000, {
        leading: true,
        trailing: false,
      })
    );
  }, []);

  useEffect(() => {
    if (company) socket.emit('subscribe', company);
  }, [company]);

  useEffect(() => {
    return () => {
      socket.emit('unsubscribe');
    };
  }, []);

  return <div></div>;
};

export default CompanyPage;
