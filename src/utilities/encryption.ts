import forge from 'node-forge';

const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQBYx6Qvk2Nuwbp6BhEC9nV00BN7OeeUBVB/ql3QGmQqwqit9Zqr
3GVXaSm59oRnNMprHsqbUM8US9TSmkr0GbpGzEn3UVNPjrVBg+Y1qtsgk2/Qncrd
wAvuCjkdLoJk414bigy/mO2L/rX7MV/HVWPslbqno8TjGfy1MGj2vw9OcDUWEwes
+U5Gx2VnDpHiI1ijHJt4E24zW4DfwrfFOm+yeGuibvUQXFDGPP7qt8Cp3LvaFt5C
hcadSlBnGS+E6osTa513iLBU1EfY83b453Id2skxmjQHFcSM1GO1UYirIzsNx1+C
8yNpZT9Eq6qBCpVYQFp23x5IYl3TzGPnkIctAgMBAAECggEALAyaTTS/ACRFJug9
po+shZH8KIb5fPsKDt30AB4oFwNQeEfFP4JyEeXO20MSPLb3vCCh/GAi7voVFY2S
pPzi7N/Nz1VdlbrD+ka8gWJNqSMeNo8kKdRw1uHhprX94prhhZ6AZsw1COIPXxwH
Xrrigm9kFmtudBPfy/LCEbOIn6z9Ln/FmOPRB66nUzUA0jTASF+75ZI67h9+18NT
Q82fsCvM6/w/OXp/9FElhtAd2o5AKHZh283FhbGvdxKEnVjbSrG8KeJ4w3krkuGm
rITGIUP9odX8D5sGYgz2rtXynY9cITqvGV9+ogSgT2YrsCQtRn2OtXG74sQ12F+e
0+IM4QKBgQCbXWdb5PPQSUf43V2PwhVtmoSMKkuiIdVndcOqZtRrmUJOJg2e7jci
p6OWG9pvxR455W46ArzqGS3u5Teo3+Z9KZYDwoSIetBXsosokDgdXbuQ56i+aqez
LPiakVCucmxrHWT6gfoOtMjWlquTLTKv8gXBQtL30VkJxu5UlUHQeQKBgQCSSR0B
1XD67X6tDnzBmx4XxhOW/0GP1rXrQPZADYepFykdz3HiKUe4/UffOypmuDLy3KJz
d8FbJX5tc8ns/fuR/76CtrAp2gwiIE3jfrGX47K9xguVCuJ9sh5mTJUqJm8DxNdh
wHtuTUdDDiu2sbpEd1BvoIP2wHkkFaRVuVsHVQKBgGvNecR3rv2de4UhBKSVhQzS
JJqlVmmflFX/js8UHtyyMSHMobLfk/5F1+p2VTEs03ZUzhEOiUreQdL71Y0mHuZG
DsN5G0EgBqRzTL/OokEuItG/DIVjuA1JbQ7DOfpxhu0kLkbsHThLFPhg/5hVyk/v
XTLmTUCLUH7KO+EQ1+PxAoGADyPwE6OCuQXhqYmpUeR7HdzLZEJxB7EiTQIBOqnr
041pHQO+drjtCnF0gd8+yTjhVQ+O5MKNSaC80Bk+2f+DjR3aGu9LlllSDionxZb0
TJMticS4qCljPb00tkPQ4Hbv4IT8AcsJO2ZWLNOHpLYKYFG1Coijf+N15k0zIAg6
Kq0CgYEAip4Me8AAKWDc89oWeGb7IZOZRprMtC8FtZOVSU50KajjJDLn8xXbrrih
5n4gEbKUPyDtIAlR3G+/BHiWvha1n0+e95PBFb8+TMsY0nVm7wwirREyTxnRknuY
u8v2iGC7BpAu7CaEfA3OKns5OyjtfwNriIPjCKf2ZmO0CsQxk7U=
-----END RSA PRIVATE KEY-----
`;

const publicKey = `
-----BEGIN PUBLIC KEY-----
MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBYx6Qvk2Nuwbp6BhEC9nV0
0BN7OeeUBVB/ql3QGmQqwqit9Zqr3GVXaSm59oRnNMprHsqbUM8US9TSmkr0GbpG
zEn3UVNPjrVBg+Y1qtsgk2/QncrdwAvuCjkdLoJk414bigy/mO2L/rX7MV/HVWPs
lbqno8TjGfy1MGj2vw9OcDUWEwes+U5Gx2VnDpHiI1ijHJt4E24zW4DfwrfFOm+y
eGuibvUQXFDGPP7qt8Cp3LvaFt5ChcadSlBnGS+E6osTa513iLBU1EfY83b453Id
2skxmjQHFcSM1GO1UYirIzsNx1+C8yNpZT9Eq6qBCpVYQFp23x5IYl3TzGPnkIct
AgMBAAE=
-----END PUBLIC KEY-----
`;

function importPublicKey() {
  return forge.pki.publicKeyFromPem(publicKey);
}

function importPrivateKey() {
  return forge.pki.privateKeyFromPem(privateKey);
}

export function encryptWithPublicKey(plaintext: string) {
  const publicKeyObj = importPublicKey();
  const encryptedData = publicKeyObj.encrypt(plaintext, 'RSAES-PKCS1-V1_5', {
    md: forge.md.sha256.create()
  });
  return forge.util.encode64(encryptedData);
}

export function decryptWithPrivateKey(encryptedData: string) {
  const privateKeyObj = importPrivateKey();
  return privateKeyObj.decrypt(forge.util.decode64(encryptedData), 'RSAES-PKCS1-V1_5', {
    md: forge.md.sha256.create()
  });
}
