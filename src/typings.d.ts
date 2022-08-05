import { Component } from 'vue';
import { RouteMeta, RouteRecordName, RouteRecordRaw } from 'vue-router';

export type AppRouteRecordRaw = {
  meta: RouteMeta;
  name: RouteRecordName;
  children?: AppRouteRecordRaw[];
} & RouteRecordRaw;

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    logo?: string;
  }
}
