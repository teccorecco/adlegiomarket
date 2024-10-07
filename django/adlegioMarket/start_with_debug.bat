@echo off

:: Auswahl des Modus (Standard: Debug-Modus)
set MODE=%1

if "%MODE%"=="prod" (
    echo Starte im Produktionsmodus...
    set DJANGO_SETTINGS_MODULE=adlegioMarket.settings
) else (
    echo Starte im Debug-Modus...
    set DJANGO_SETTINGS_MODULE=adlegioMarket.settingsDebug
)

:: Virtuelle Umgebung aktivieren
call venv\Scripts\activate

:: Starte den Django-Server mit der gewählten settings.py
python manage.py runserver

:: Deaktiviere die virtuelle Umgebung nach dem Beenden des Servers
deactivate
