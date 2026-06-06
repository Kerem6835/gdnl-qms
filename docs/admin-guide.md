# Admin Kilavuzu

## Kullanici ve Departman

Kullanicilar `/api/users`, departmanlar `/api/departments` uzerinden yonetilir.

## Roller ve Yetkiler

RBAC izinleri:

- goruntule
- olustur
- duzenle
- sil
- onayla
- arsivle

Coklu rol destegi canli Worker middleware seviyesinde uygulanmalidir.

## Dosya Yonetimi

Dosya icerigi R2 icinde, metadata D1 icinde tutulur. Dosya icerigi metin olarak forma gomulmez.

## Denetim Izi

Tum kritik islemler `audit_logs` ve `activity_logs` icine yazilmalidir.
