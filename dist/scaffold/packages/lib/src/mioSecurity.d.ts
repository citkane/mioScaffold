/**
 * #### Security for mio, while at v0, should be considered as Proof of Concept.
 * The security construct provideds a flow of tokens through microservices to enforce identity and permissions.
 *
 * This should not require microservices to expose their locations to anything outside of the system, such as 3rd party auth services.
 *
 * Some FOSS libraries may be suitable as a dependency deployment within mio, for example:
 *
 * - <a href="https://supertokens.com/" target="_blank">SuperTokens</a>
 *
 * For now, we set security paranoia to 0.01, and proceed with building a simple security framework that can grow into best of class.
 *
 * @module
 */
import crypto from './mioSecurity/crypto/crypto';
export { crypto };
export default crypto;
//# sourceMappingURL=mioSecurity.d.ts.map