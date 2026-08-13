import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.11.2:0',
  releaseNotes: {
    en_US: `Security release. Upgrading is recommended for every guardian.

Fedimint 0.11.2 hardens the guardian against malformed or hostile requests from peers, clients, and Lightning gateways. API paths that could previously be made to panic — taking the guardian offline — now return errors instead, Lightning contracts are bound to the offer they were issued for and can only be funded once, and the on-chain wallet rejects peg-ins and peg-out fee rates it cannot safely process.`,
    es_ES: `Versión de seguridad. Se recomienda actualizar a todos los guardianes.

Fedimint 0.11.2 refuerza al guardian frente a peticiones malformadas u hostiles procedentes de pares, clientes y pasarelas Lightning. Las rutas de la API que antes podían provocar un pánico — dejando al guardian fuera de línea — ahora devuelven errores en su lugar, los contratos Lightning quedan vinculados a la oferta para la que se emitieron y solo pueden financiarse una vez, y el monedero on-chain rechaza los peg-ins y las tarifas de peg-out que no puede procesar de forma segura.`,
    de_DE: `Sicherheitsrelease. Ein Upgrade wird jedem Guardian empfohlen.

Fedimint 0.11.2 härtet den Guardian gegen fehlerhafte oder bösartige Anfragen von Peers, Clients und Lightning-Gateways ab. API-Pfade, die sich bisher zu einem Panic bringen ließen — wodurch der Guardian offline ging — geben nun stattdessen Fehler zurück, Lightning-Verträge sind an das Angebot gebunden, für das sie ausgestellt wurden, und können nur einmal finanziert werden, und die On-Chain-Wallet weist Peg-ins und Peg-out-Gebührensätze zurück, die sie nicht sicher verarbeiten kann.`,
    pl_PL: `Wydanie bezpieczeństwa. Aktualizacja jest zalecana każdemu guardianowi.

Fedimint 0.11.2 wzmacnia guardiana przed nieprawidłowymi lub wrogimi żądaniami od innych węzłów, klientów i bramek Lightning. Ścieżki API, które wcześniej można było doprowadzić do paniki — wyłączając guardiana — zwracają teraz błędy, kontrakty Lightning są powiązane z ofertą, dla której zostały wystawione, i mogą zostać sfinansowane tylko raz, a portfel on-chain odrzuca peg-iny oraz stawki opłat peg-out, których nie jest w stanie bezpiecznie przetworzyć.`,
    fr_FR: `Version de sécurité. La mise à niveau est recommandée à tous les guardians.

Fedimint 0.11.2 renforce le guardian face aux requêtes malformées ou hostiles provenant des pairs, des clients et des passerelles Lightning. Les routes de l'API qui pouvaient auparavant être amenées à paniquer — mettant le guardian hors ligne — renvoient désormais des erreurs, les contrats Lightning sont liés à l'offre pour laquelle ils ont été émis et ne peuvent être financés qu'une seule fois, et le portefeuille on-chain rejette les peg-ins et les taux de frais de peg-out qu'il ne peut pas traiter en toute sécurité.`,
  },
  migrations: {
    // No StartOS-side migration required for 0.11.1 → 0.11.2:
    // - 0.11.2 is a security patch set on the 0.11 line; there is no on-disk
    //   db schema change, so fedimintd starts on the existing data directory
    //   as-is.
    // - The package's own store.json schema (bitcoinBackend) is unchanged.
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
