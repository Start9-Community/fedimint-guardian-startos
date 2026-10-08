import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

export const current = VersionInfo.of({
  version: '0.12.1:2',
  releaseNotes: {
    en_US: `- Set Guardian Password asks for confirmation before replacing an existing password.
- Bitcoin Configuration explains what each backend means for the guardian.
- The interface left over from the StartOS 0.3.5 version of this service is removed. A domain or .onion address added to it no longer reaches the guardian; add one to the Guardian Interface instead.
- Bitcoin must be at least 28.4:29, 29.4:16, 30.3:16 or 31.1:16, depending on its major version. Bitcoin Knots (pre-RDTS) 29.3:29 or later also works.`,
    es_ES: `- Establecer Contraseña del Guardián pide confirmación antes de reemplazar una contraseña existente.
- Configuración de Bitcoin explica qué implica cada backend para el guardián.
- Se elimina la interfaz que quedaba de la versión de este servicio para StartOS 0.3.5. Un dominio o una dirección .onion añadidos a ella ya no llegan al guardián; añade uno a la Interfaz del Guardián.
- Bitcoin debe ser al menos la versión 28.4:29, 29.4:16, 30.3:16 o 31.1:16, según su versión principal. También funciona Bitcoin Knots (pre-RDTS) 29.3:29 o posterior.`,
    de_DE: `- Guardian-Passwort festlegen fragt nach einer Bestätigung, bevor ein vorhandenes Passwort ersetzt wird.
- Bitcoin-Konfiguration erklärt, was jedes Backend für den Guardian bedeutet.
- Die von der StartOS-0.3.5-Version dieses Dienstes verbliebene Schnittstelle wird entfernt. Eine dort hinzugefügte Domain oder .onion-Adresse erreicht den Guardian nicht mehr; füge stattdessen eine zur Guardian-Schnittstelle hinzu.
- Bitcoin muss je nach Hauptversion mindestens 28.4:29, 29.4:16, 30.3:16 oder 31.1:16 sein. Bitcoin Knots (pre-RDTS) ab 29.3:29 funktioniert ebenfalls.`,
    pl_PL: `- Ustaw Hasło Strażnika prosi o potwierdzenie przed zastąpieniem istniejącego hasła.
- Konfiguracja Bitcoin wyjaśnia, co każdy backend oznacza dla strażnika.
- Usunięto interfejs pozostały po wersji tej usługi dla StartOS 0.3.5. Domena lub adres .onion dodane do niego nie prowadzą już do strażnika; dodaj je do Interfejsu Strażnika.
- Bitcoin musi być co najmniej w wersji 28.4:29, 29.4:16, 30.3:16 lub 31.1:16, zależnie od wersji głównej. Działa też Bitcoin Knots (pre-RDTS) 29.3:29 lub nowszy.`,
    fr_FR: `- Définir le mot de passe du Guardian demande une confirmation avant de remplacer un mot de passe existant.
- Configuration Bitcoin explique ce que chaque backend implique pour le guardian.
- L’interface laissée par la version de ce service pour StartOS 0.3.5 est supprimée. Un domaine ou une adresse .onion qui lui a été ajouté n’atteint plus le guardian ; ajoutez-en un à l’Interface Guardian.
- Bitcoin doit être au moins en version 28.4:29, 29.4:16, 30.3:16 ou 31.1:16, selon sa version majeure. Bitcoin Knots (pre-RDTS) 29.3:29 ou plus récent fonctionne aussi.`,
  },
  migrations: {
    up: async ({ effects }) => {
      await sdk.MultiHost.of(effects, 'main').retire()
    },
    down: IMPOSSIBLE,
  },
})
