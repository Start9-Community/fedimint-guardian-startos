import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_0_12_0_0 = VersionInfo.of({
  version: '0.12.0:0',
  releaseNotes: {
    en_US: `Major release. Coordinate this upgrade with your fellow guardians.

The P2P networking stack was upgraded to Iroh 1.0, which cannot connect to guardians running earlier releases. In a federation of 3f+1 guardians, up to f guardians can upgrade early on their own, then at least f+1 guardians have to upgrade together in a coordinated window (consensus pauses until enough have switched), after which the remaining f can follow at their own pace.

Fedimint 0.12.0 also brings much faster Lightning payments, lets wallet users recover without downtime, and includes the security hardening already shipped in 0.11.2. Newly created federations now default to the next-generation module set; existing federations keep their configured modules and are unaffected.`,
    es_ES: `Versión mayor. Coordina esta actualización con los demás guardianes.

La pila de red P2P se ha actualizado a Iroh 1.0, que no puede conectarse con guardianes que ejecutan versiones anteriores. En una federación de 3f+1 guardianes, hasta f guardianes pueden actualizar antes por su cuenta, luego al menos f+1 guardianes tienen que actualizar juntos en una ventana coordinada (el consenso se pausa hasta que suficientes hayan cambiado), y después los f restantes pueden seguir a su propio ritmo.

Fedimint 0.12.0 también trae pagos Lightning mucho más rápidos, permite a los usuarios recuperar su monedero sin interrupciones e incluye el refuerzo de seguridad ya distribuido en 0.11.2. Las federaciones recién creadas usan ahora por defecto el conjunto de módulos de nueva generación; las federaciones existentes conservan sus módulos configurados y no se ven afectadas.`,
    de_DE: `Major-Release. Koordiniere dieses Upgrade mit den anderen Guardians.

Der P2P-Netzwerkstack wurde auf Iroh 1.0 aktualisiert, das sich nicht mit Guardians auf früheren Versionen verbinden kann. In einer Föderation aus 3f+1 Guardians können bis zu f Guardians vorab einzeln aktualisieren, dann müssen mindestens f+1 Guardians gemeinsam in einem koordinierten Zeitfenster aktualisieren (der Konsens pausiert, bis genügend umgestiegen sind), danach können die übrigen f in eigenem Tempo folgen.

Fedimint 0.12.0 bringt außerdem deutlich schnellere Lightning-Zahlungen, lässt Wallet-Nutzer ohne Ausfallzeit wiederherstellen und enthält die bereits mit 0.11.2 ausgelieferte Sicherheitshärtung. Neu erstellte Föderationen verwenden jetzt standardmäßig den Modulsatz der nächsten Generation; bestehende Föderationen behalten ihre konfigurierten Module und sind nicht betroffen.`,
    pl_PL: `Wydanie główne. Skoordynuj tę aktualizację z pozostałymi guardianami.

Stos sieciowy P2P został zaktualizowany do Iroh 1.0, który nie może łączyć się z guardianami działającymi na wcześniejszych wersjach. W federacji 3f+1 guardianów maksymalnie f guardianów może zaktualizować się wcześniej samodzielnie, następnie co najmniej f+1 guardianów musi zaktualizować się razem w skoordynowanym oknie (konsensus zatrzymuje się, aż wystarczająca liczba przejdzie na nową wersję), po czym pozostałych f może dołączyć we własnym tempie.

Fedimint 0.12.0 przynosi też znacznie szybsze płatności Lightning, pozwala użytkownikom portfeli odzyskiwać środki bez przestoju i zawiera wzmocnienia bezpieczeństwa dostarczone już w 0.11.2. Nowo tworzone federacje domyślnie używają teraz zestawu modułów nowej generacji; istniejące federacje zachowują skonfigurowane moduły i nie są objęte zmianą.`,
    fr_FR: `Version majeure. Coordonnez cette mise à niveau avec les autres guardians.

La pile réseau P2P a été mise à niveau vers Iroh 1.0, qui ne peut pas se connecter aux guardians exécutant des versions antérieures. Dans une fédération de 3f+1 guardians, jusqu'à f guardians peuvent se mettre à niveau en avance individuellement, puis au moins f+1 guardians doivent se mettre à niveau ensemble dans une fenêtre coordonnée (le consensus est en pause jusqu'à ce qu'un nombre suffisant ait basculé), après quoi les f restants peuvent suivre à leur rythme.

Fedimint 0.12.0 apporte aussi des paiements Lightning nettement plus rapides, permet aux utilisateurs de récupérer leur portefeuille sans interruption et inclut le renforcement de sécurité déjà livré avec la 0.11.2. Les fédérations nouvellement créées utilisent désormais par défaut le jeu de modules de nouvelle génération ; les fédérations existantes conservent leurs modules configurés et ne sont pas concernées.`,
  },
  migrations: {
    // No StartOS-side migration required for 0.11.2 → 0.12.0:
    // - fedimintd migrates its own database on startup; there is no
    //   StartOS-level data layout change.
    // - Guardian configs are no longer encrypted at rest as of 0.12.0, but
    //   fedimintd reads legacy encrypted configs transparently, so nothing
    //   needs to happen here.
    // - The package's own store.json schema (bitcoinBackend) is unchanged.
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
