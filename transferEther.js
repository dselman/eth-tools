/**
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/
const transferEther = require('./util');

const args = process.argv.slice(2);

const fromAccount = args[0];
const toAccount = args[1];
const privateKey = args[2]
const weiValue = Number.parseInt(args[3]);
const rpcUrl = args[4];

if (args.length !== 5) {
  console.log('Error, invalid arguments. Usage: transferEther <fromAccount> <toAccount> <privateKey> <weiValue> <rpcUrl>');
  process.exit(-1);
}

async function transfer() {
  const result = await transferEther( {
    fromAccount,
    toAccount,
    privateKey,
    weiValue,
    rpcUrl
  }, null);
}

transfer();