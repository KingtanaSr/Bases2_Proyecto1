// backend/config/dbConfig.js
const oracledb = require('oracledb');
const path = require('path');

// Configurar el cliente Oracle solo una vez
oracledb.initOracleClient({
  libDir: 'C:\\Users\\Ariana\\Desktop\\oracle\\instantclient_23_7\\instantclient-basic-windows.x64-23.7.0.25.01\\instantclient_23_7'
});

const walletPath = path.join('C:', 'Users', 'Ariana', 'Desktop', 'Wallet_JQCKK0W64KNE3IXY.zip');
process.env.TNS_ADMIN = walletPath;

const getConnection = async () => {
  return await oracledb.getConnection({
    user: 'ADMIN',
    password: 'BasesD.d7gk37',
    connectString: `(description=(retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.us-ashburn-1.oraclecloud.com))(connect_data=(service_name=g7fd31be1fff706_jqckk0w64kne3ixy_low.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))`,
  });
};

module.exports = {
  getConnection,
};
